import * as React from 'react';
import PropTypes from 'prop-types';
import {get} from 'lodash';

import {gettext} from 'utils';
import {canUserUpdateTopic} from 'users/utils';

import {SearchResultTagList} from './SearchResultTagList';
import {Tag} from 'components/Tag';

export function SearchResultsTopicRow({
    user,
    searchParams,
    activeTopic,
    navigations,
    showSaveTopic,
    showMyTopic,
    topicType,
    saveMyTopic,
    toggleNavigation,
    deselectMyTopic,
}) {
    const tags = [];
    const hasActiveTopic = get(activeTopic, '_id') != null;

    if (hasActiveTopic && showMyTopic) {
        tags.push(
            <Tag
                key="tags-topics--topic"
                testId="tags-topics--my-topic"
                text={activeTopic.label}
                shade="inverse"
                onClick={(event) => {
                    event.preventDefault();
                    deselectMyTopic(activeTopic._id);
                }}
            />
        );
    }

    if (get(searchParams, 'navigation.length', 0)) {
        searchParams.navigation.forEach((navId) => {
            const navigation = navigations[navId];

            tags.push(
                <Tag
                    key={`tags-topics--nav-${navId}`}
                    testId="tags-topic"
                    text={navigation.name}
                    shade="inverse"
                    onClick={(event) => {
                        event.preventDefault();
                        toggleNavigation(navigation);
                    }}
                />
            );
        });
    }

    if (!tags.length && !showSaveTopic) {
        return null;
    }

    return (
        <SearchResultTagList
            testId="search-results--topics"
            title={tags.length ? gettext('Topic') : null}
            tags={tags}
        >
            {!showSaveTopic ? null : (
                <div className="tags-list-row__button-group">
                    {!hasActiveTopic || !canUserUpdateTopic(user, activeTopic) ? null : (
                        <button
                            data-test-id="update-topic-btn"
                            className="nh-button nh-button--tertiary nh-button--small"
                            onClick={(event) => {
                                event.preventDefault();
                                saveMyTopic(Object.assign(
                                    {},
                                    activeTopic,
                                    searchParams,
                                    {query: searchParams.query},
                                    {topic_type: topicType},
                                    {filter: searchParams.filter}
                                ));
                            }}
                        >
                            {gettext('Update topic')}
                        </button>
                    )}
                    <button
                        data-test-id="save-topic-btn"
                        className="nh-button nh-button--tertiary nh-button--small"
                        onClick={(event) => {
                            event.preventDefault();
                            saveMyTopic(Object.assign(
                                {},
                                searchParams,
                                {topic_type: topicType},
                                {filter: searchParams.filter}
                            ));
                        }}
                    >
                        {hasActiveTopic ?
                            gettext('Save as new topic') :
                            gettext('Save new topic')
                        }
                    </button>
                </div>
            )}
        </SearchResultTagList>
    );
}

SearchResultsTopicRow.propTypes = {
    user: PropTypes.object,
    searchParams: PropTypes.object,
    activeTopic: PropTypes.object,
    navigations: PropTypes.object,
    showSaveTopic: PropTypes.bool,
    showMyTopic: PropTypes.bool,
    topicType: PropTypes.string,
    saveMyTopic: PropTypes.func,
    toggleNavigation: PropTypes.func.isRequired,
    deselectMyTopic: PropTypes.func,
};
