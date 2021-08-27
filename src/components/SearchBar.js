import React, { Component } from 'react';

import {
    SearchBarContainer,
    SearchBarText,
    SearchBarButton,
    SearchAreas,
    SearchByType,
    InputContainer,
    SearchBarInput,
    MyFreeCompanyName,
} from '../styles/SearchBarStyle';
import {
    getFreeCompanyInformations,
    getMembersSearchResults,
} from '../services/fetchDataSrv';

import { SearchResults } from './SearchResults';

export class SearchBar extends Component {
    state = {
        query: '',
        freeCompanyResults: [],
        memberResults: [],
        freeCompanyButtonClicked: false,
        memberButtonClicked: false,
    };

    toggleSearch = ({ target: { name: buttonName } }) => {
        this.setState({ [buttonName]: !this.state[buttonName] });
    };
    onChange = ({ target: { value } }) => {
        this.setState({ query: value });
    };

    searchFreeCompanyResults = async () => {
        const { data: results } = await getFreeCompanyInformations(
            this.state.query
        );
        this.setState({ freeCompanyResults: results, memberResults: [] });
    };

    searchMembersResults = async () => {
        const { data: results } = await getMembersSearchResults(this.state.query);
        this.setState({ memberResults: results, freeCompanyResults: [] });
    };

    clearResults = () => {
        this.setState({
            query: '',
            freeCompanyResults: [],
            memberResults: [],
            freeCompanyButtonClicked: false,
            memberButtonClicked: false,
        });
    };

    render() {
        const {
            freeCompanyResults,
            memberResults,
            freeCompanyButtonClicked,
            memberButtonClicked,
        } = this.state;
        return (
            <SearchBarContainer>
                <SearchAreas>
                    <SearchBarText>
                        Search Here!
                    </SearchBarText>

                    <SearchByType>
                        <SearchBarButton
                            name="freeCompanyButtonClicked"
                            onClick={this.toggleSearch}
                        >
                            FreeCompany
                        </SearchBarButton>
                        {freeCompanyButtonClicked && (
                            <InputContainer>
                                <SearchBarInput
                                    placeholder="Enter the name of a free company"
                                    onChange={this.onChange}
                                    value={this.state.query}
                                />
                                <SearchBarButton onClick={this.searchFreeCompanyResults}>
                                    Search
                                </SearchBarButton>
                            </InputContainer>
                        )}
                    </SearchByType>

                    <SearchByType>
                        <SearchBarButton
                            name="memberButtonClicked"
                            onClick={this.toggleSearch}
                        >
                            Member
                        </SearchBarButton>

                        {memberButtonClicked && (
                            <InputContainer>
                                <SearchBarInput
                                    placeholder="Enter the name of a character"
                                    onChange={this.onChange}
                                    value={this.state.query}
                                />
                                <SearchBarButton onClick={this.searchMembersResults}>
                                    Search
                                </SearchBarButton>
                            </InputContainer>
                        )}
                    </SearchByType>
                </SearchAreas>

                {(freeCompanyResults && (
                    <SearchResults
                        freeCompanyResults={freeCompanyResults}
                        memberResults={memberResults}
                        clearResults={this.clearResults}
                    />
                )) ||
                (memberResults && (
                    <SearchResults
                        freeCompanyResults={freeCompanyResults}
                        memberResults={memberResults}
                        clearResults={this.clearResults}
                    />
                ))}
            </SearchBarContainer>
        );
    }
}
