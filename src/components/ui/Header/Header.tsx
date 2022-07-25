import React, {useCallback, useEffect, useState} from 'react';
import {Button, IconButton, Paper} from '@material-ui/core';
import {
    ExpandMoreOutlined as ArrowBottom,
    Menu as MenuIcon,
    NotificationsNoneOutlined as NotificationIcon,
    SearchOutlined as SearchIcon,
    SmsOutlined as MessageIcon,
} from '@material-ui/icons';
import styles from './Header.module.scss';
import Link from "next/link";
import Image from "next/image";
import {AuthDialog} from "../../AuthDialog/AuthDialog";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {useTypedSelector} from "../../../utils/hooks/UseTypedSelector";
import {useAction} from "../../../utils/hooks/hooks-utils";
import {authActions} from "../../../redux/reducers/auth/auth-actions";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const rootStyle = {
    root: styles.root
} as const

export const Header = () => {

    const {isAuth, openAuthDialog,user} = useTypedSelector(state => state.auth)

    const onOpenAuthDialog = useAction(authActions.setOpenAuthDialog)
    const onLogoutHandler = useAction(authActions.logout)

    const onCloseAuthDialog = useCallback(() => {
        onOpenAuthDialog(false)
    }, [onOpenAuthDialog])
    const onClickOpenAuthDialog = useCallback(() => {
        onOpenAuthDialog(true)
    }, [onOpenAuthDialog])

    useEffect(() => {
        if (isAuth) {
            onOpenAuthDialog(false)
        }
    }, [isAuth])


    return (
        <Paper classes={rootStyle} elevation={0}>
            <div className="d-flex align-center">
                <IconButton>
                    <MenuIcon/>
                </IconButton>
                <Link href="/">
                    <a>
                        <svg className={styles.logo} viewBox="0 0 24 25">
                            <path fill="#e8a427" d="M0 19h8.5v6H0v-6z"></path>
                            <path d="M0 7h8.5v18l6.5-6V7h9V0H0v7z"></path>
                            <path fill="rgba(0,0,0,0.15)" d="M7.5 19h1v6l-1-6z"></path>
                        </svg>
                    </a>
                </Link>
                <div className={styles.searchBlock}>
                    <SearchIcon/>
                    <input placeholder="Поиск"/>
                </div>
                <Link href={'/write'}>
                    <Button variant="contained" className={styles.penButton}>
                        Новая запись
                    </Button>
                </Link>

            </div>
            <div className="d-flex align-center">
                {
                    isAuth
                        ?
                        <>
                            <IconButton>
                                <MessageIcon/>
                            </IconButton>
                            <IconButton>
                                <NotificationIcon/>
                            </IconButton>

                            <Link href={`/profile/${user.id}`}>
                                <a className="d-flex align-center">
                                    <Image
                                        className={styles.avatar}
                                        alt="Remy Sharp"
                                        width={'40px'}
                                        height={'40px'}
                                        src="data:image/jpeg;base64,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"
                                    />
                                    <ArrowBottom/>
                                </a>
                            </Link>
                            <IconButton onClick={onLogoutHandler}>
                                <ExitToAppIcon/>
                            </IconButton>
                        </>
                        :
                        <IconButton onClick={onClickOpenAuthDialog}>
                            <AccountCircleOutlinedIcon/>
                        </IconButton>
                }
            </div>
            <AuthDialog openDialog={openAuthDialog} closeDialog={onCloseAuthDialog}/>
        </Paper>
    );
};
