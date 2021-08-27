import React from 'react';

import {
    HeaderContainer,
    HeaderTitle,
    HeaderDescription,
    LinkToAbout,
} from '../styles/HeaderStyle';

export const Header = () => {
    return (
        <HeaderContainer to="/">
            <HeaderTitle>Final Fantasy XIV Class Project</HeaderTitle>
            <HeaderDescription>
                This App is used to looks up Characters and Free Companies from FFXIV.
                Enter a Character Name or FC Name to find some Data on one.
            </HeaderDescription>
        </HeaderContainer>
    );
};
