import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { FreeCompanyPage } from './components/FreeCompanyPage';
import { SearchBar } from './components/SearchBar';
import { MemberPage } from './components/MemberPage';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Route path="/" render={() => <Header />} />
                <Route path="/" render={() => <SearchBar />} />
                <Route
                    exact
                    path="/freeCompany/:freeCompanyId"
                    render={(props) => <FreeCompanyPage {...props} />}
                />
                <Route
                    exact
                    path="/character/:memberID"
                    render={(props) => <MemberPage {...props} />}
                />
            </BrowserRouter>
        </div>
    );
}

export default App;