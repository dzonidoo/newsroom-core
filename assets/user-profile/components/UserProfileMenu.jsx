import React from 'react';
import PropTypes from 'prop-types';

function UserProfileMenu({links, onClick}) {
    return (
        <div className="profile__side-navigation__items">
            {links.map((link) => (
                <a key={link.name}
                    href="#"
                    className={`nh-button w-100 nh-button--${link.active ? 'primary' : 'secondary'}`}
                    name={link.name}
                    onClick={(event) => onClick(event, link.name)}
                >{link.label}</a>
            ))}
        </div>
    );
}

UserProfileMenu.propTypes = {
    links: PropTypes.array,
    onClick: PropTypes.func,
};

export default UserProfileMenu;
