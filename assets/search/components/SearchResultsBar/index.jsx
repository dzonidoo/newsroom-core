import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {connect} from 'react-redux';

import {gettext} from 'utils';
import {searchParamsSelector, navigationsByIdSelector, filterGroupsByIdSelector} from '../../selectors';
import {getAdvancedSearchFields} from '../../utils';
import {
    toggleNavigation,
    toggleAdvancedSearchField,
    setAdvancedSearchKeywords,
    toggleFilter,
    setCreatedFilter,
    resetSearchParamsAndUpdateURL,
    clearAdvancedSearchParams,
    resetFilter,
    deselectMyTopic,
} from '../../actions';

import {SearchResultTagsList} from './SearchResultTagsList';
import NewItemsIcon from '../NewItemsIcon';


class SearchResultsBarComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {isTagSectionShown: false};
        this.toggleTagSection = this.toggleTagSection.bind(this);
        this.toggleNavigation = this.toggleNavigation.bind(this);
        this.setQuery = this.setQuery.bind(this);
        this.setAdvancedSearchKeywords = this.setAdvancedSearchKeywords.bind(this);
        this.toggleAdvancedSearchField = this.toggleAdvancedSearchField.bind(this);
        this.clearAdvancedSearchParams = this.clearAdvancedSearchParams.bind(this);
        this.setCreatedFilter = this.setCreatedFilter.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.resetFilter = this.resetFilter.bind(this);
    }

    toggleTagSection() {
        this.setState((prevState) => ({isTagSectionShown: !prevState.isTagSectionShown}));
    }

    toggleNavigation(navigation) {
        this.props.toggleNavigation(navigation);
        this.props.refresh();
    }

    setQuery(query) {
        this.props.setQuery(query);
        this.props.refresh();
    }

    setAdvancedSearchKeywords(field, keywords) {
        this.props.setAdvancedSearchKeywords(field, keywords);
        this.props.refresh();
    }

    toggleAdvancedSearchField(field) {
        this.props.toggleAdvancedSearchField(field);
        this.props.refresh();
    }

    clearAdvancedSearchParams() {
        this.props.clearAdvancedSearchParams();
        this.props.refresh();
    }

    setCreatedFilter(filter) {
        this.props.setCreatedFilter(filter);
        this.props.refresh();
    }

    toggleFilter(key, value, single) {
        this.props.toggleFilter(key, value, single);
        this.props.refresh();
    }

    resetFilter() {
        this.props.resetFilter();
        this.props.refresh();
    }

    render() {
        const {isTagSectionShown} = this.state;
        const numberFormatter = (new Intl.NumberFormat(undefined, {style: 'decimal'}));

        return (
            <React.Fragment>
                <div
                    data-test-id="search-results-bar"
                    className="wire-column__main-header-container"
                >
                    {!this.props.showTotalItems ? null : (
                        <div className="navbar navbar--flex line-shadow-end--light">
                            {!this.props.showTotalItems ? null : (
                                <div className="search-result-count">
                                    {this.props.totalItems === 1 ?
                                        gettext('1 result') :
                                        gettext('{{ count }} results', {
                                            count: numberFormatter.format(this.props.totalItems || 0)
                                        })
                                    }
                                </div>
                            )}
                            <div className="navbar__button-group">
                                <button
                                    className="nh-button nh-button--tertiary"
                                    onClick={() => {
                                        this.props.resetSearchParamsAndUpdateURL();
                                        this.toggleTagSection();
                                        this.props.refresh();
                                    }}
                                >
                                    {gettext('Clear all')}
                                </button>
                                <button
                                    data-test-id="toggle-search-bar"
                                    onClick={this.toggleTagSection}
                                    className="icon-button icon-button--tertiary icon-button--bordered"
                                >
                                    <i className={classNames(
                                        'icon--arrow-right',
                                        {
                                            'icon--collapsible-open': isTagSectionShown,
                                            'icon--collapsible-closed': !isTagSectionShown,
                                        }
                                    )} />
                                </button>
                            </div>
                        </div>
                    )}
                    {!isTagSectionShown ? null : (
                        <SearchResultTagsList
                            user={this.props.user}
                            showSaveTopic={this.props.showSaveTopic}
                            saveMyTopic={this.props.saveMyTopic}
                            searchParams={this.props.searchParams}
                            activeTopic={this.props.activeTopic}
                            topicType={this.props.topicType}
                            navigations={this.props.navigations}
                            filterGroups={this.props.filterGroups}
                            availableFields={this.props.availableFields}
                            toggleNavigation={this.props.toggleNavigation}
                            toggleAdvancedSearchField={this.props.toggleAdvancedSearchField}
                            setQuery={this.props.setQuery}
                            setAdvancedSearchKeywords={this.props.setAdvancedSearchKeywords}
                            toggleFilter={this.props.toggleFilter}
                            setCreatedFilter={this.props.setCreatedFilter}
                            clearAdvancedSearchParams={this.props.clearAdvancedSearchParams}
                            deselectMyTopic={this.props.deselectMyTopic}
                            resetFilter={this.resetFilter}
                        />
                    )}

                    {this.props.children}
                </div>

                {!(this.props.newItems || []).length ? null : (
                    <div className="navbar navbar--flex navbar--small">
                        <div className="navbar__inner navbar__inner--end">
                            <NewItemsIcon
                                newItems={this.props.newItems}
                                refresh={this.props.refresh}
                            />
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

SearchResultsBarComponent.propTypes = {
    user: PropTypes.object,

    minimizeSearchResults: PropTypes.bool,
    showTotalItems: PropTypes.bool,
    showTotalLabel: PropTypes.bool,
    showSaveTopic: PropTypes.bool,

    totalItems: PropTypes.number,
    totalItemsLabel: PropTypes.string,

    saveMyTopic: PropTypes.func,
    searchParams: PropTypes.object,
    activeTopic: PropTypes.object,
    topicType: PropTypes.string,

    newItems: PropTypes.array,
    refresh: PropTypes.func,

    navigations: PropTypes.object,
    filterGroups: PropTypes.object,
    availableFields: PropTypes.arrayOf(PropTypes.string).isRequired,

    toggleNavigation: PropTypes.func.isRequired,
    toggleAdvancedSearchField: PropTypes.func.isRequired,
    setQuery: PropTypes.func.isRequired,
    setAdvancedSearchKeywords: PropTypes.func.isRequired,
    toggleFilter: PropTypes.func.isRequired,
    setCreatedFilter: PropTypes.func.isRequired,
    resetSearchParamsAndUpdateURL: PropTypes.func.isRequired,
    clearAdvancedSearchParams: PropTypes.func.isRequired,
    deselectMyTopic: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,

    children: PropTypes.node,
};

SearchResultsBarComponent.defaultProps = {
    minimizeSearchResults: false,
    showTotalItems: true,
    showTotalLabel: true,
    showSaveTopic: false,
};

const mapStateToProps = (state) => ({
    user: state.userObject,
    searchParams: searchParamsSelector(state),
    navigations: navigationsByIdSelector(state),
    filterGroups: filterGroupsByIdSelector(state),
    availableFields: getAdvancedSearchFields(state.context),
});

const mapDispatchToProps = {
    toggleNavigation,
    toggleAdvancedSearchField,
    setAdvancedSearchKeywords,
    toggleFilter,
    setCreatedFilter,
    resetSearchParamsAndUpdateURL,
    clearAdvancedSearchParams,
    deselectMyTopic,
    resetFilter,
};

export const SearchResultsBar = connect(mapStateToProps, mapDispatchToProps)(SearchResultsBarComponent);
