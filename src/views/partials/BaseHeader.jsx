import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../plugin/Context";
import { useAuthStore } from "../../store/auth";
import i18next from "i18next";


function BaseHeader() {
    const [cartCount, setCartCount] = useContext(CartContext);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();



    const handleSearchSubmit = () => {
        navigate(`/search/?search=${searchQuery}`);
    };

    const [isLoggedIn, user] = useAuthStore((state) => [state.isLoggedIn, state.user]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary custom-nav" data-bs-theme="dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img src="/static/images/e-instructor.svg" alt="Logo" style={{ width: '120px', height: 'auto' }} className='logo'/>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/pages/about-us/">
                                    <i className="fas fa-address-card"></i> Про нас
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-chalkboard-user"></i> Інструктор
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to={`/instructor/dashboard/`}
                                        >
                                            <i className="bi bi-grid-fill"></i> Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={`/instructor/courses/`}>
                                            <i className="fas fa-shopping-cart"></i> My Courses
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to={`/instructor/create-course/`}
                                        >
                                            <i className="fas fa-plus"></i> Create Course
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={`/instructor/reviews/`}>
                                            <i className="fas fa-star"></i> Reviews{" "}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to={`/instructor/question-answer/`}
                                        >
                                            <i className="fas fa-envelope"></i> Q/A{" "}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to={`/instructor/students/`}
                                        >
                                            <i className="fas fa-users"></i> Students{" "}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={`/instructor/earning/`}>
                                            <i className="fas fa-dollar-sign"></i> Earning{" "}
                                        </Link>
                                    </li>

                                    <li>
                                        <Link className="dropdown-item" to={`/instructor/profile/`}>
                                            <i className="fas fa-gear"></i> Settings & Profile{" "}
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-graduation-cap"></i> Студент
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to={`/student/dashboard/`}>
                                            {" "}
                                            <i className="bi bi-grid-fill"></i> Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={`/student/courses/`}>
                                            {" "}
                                            <i className="fas fa-shopping-cart"></i>My Courses
                                        </Link>
                                    </li>

                                    <li>
                                        <Link className="dropdown-item" to={`/student/wishlist/`}>
                                            {" "}
                                            <i className="fas fa-heart"></i> Wishlist{" "}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to={`/student/question-answer/`}
                                        >
                                            {" "}
                                            <i className="fas fa-envelope"></i> Q/A{" "}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={`/student/profile/`}>
                                            {" "}
                                            <i className="fas fa-gear"></i> Profile & Settings
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                        <div className="d-flex" role="search">
                            <input
                                className="form-control me-2 w-200 custom-input"
                                type="search"
                                placeholder="Що ви хочете вивчити?"
                                aria-label="Search Courses"
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onClick={handleSearchSubmit}

                            />
                            {/*<button*/}
                            {/*    onClick={handleSearchSubmit}*/}
                            {/*    className="btn btn-outline-success w-50"*/}
                            {/*    type="submit"*/}
                            {/*>*/}
                            {/*    Search <i className="fas fa-search"></i>*/}
                            {/*</button>*/}
                        </div>
                        {isLoggedIn() === true ? (
                            <>
                                <Link to="/logout/" className="btn btn-primary ms-2" type="submit">
                                    Вихід <i className="fas fa-usign-out-alt"></i>
                                </Link>
                                <Link className="btn btn-success ms-2" to="/cart/">
                                    Кошик ({cartCount}) <i className="fas fa-shopping-cart"> </i>
                                </Link>
                            </>

                        ) : (
                            <>
                                {/* Login and register button */}
                                <Link to="/login/" className="btn btn-primary ms-2" type="submit">
                                    Увійти <i className="fas fa-sign-in-alt"></i>
                                </Link>
                                <Link
                                    to="/register/"
                                    className="btn btn-success ms-2"
                                    type="submit"
                                >
                                    Приєднатися <i className="fas fa-user-plus"> </i>
                                </Link>
                            </>
                        )}

                        <ul className="navbar-nav mb-2 mb-lg-0">

                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-globe fa-lg"></i>
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to="#" onClick={() => i18next.changeLanguage('uk')}>
                                            <img
                                                src="https://flagcdn.com/ua.svg"
                                                alt="Ukrainian"
                                                width="20"
                                                height="15"
                                                className="me-2"
                                            />
                                            Українська
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="#" onClick={() => i18next.changeLanguage('en')} >
                                            <img
                                                src="https://flagcdn.com/gb.svg"
                                                alt="English"
                                                width="20"
                                                height="15"
                                                className="me-2"
                                            />
                                            English
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        {/*<Link className="btn btn-success ms-2" to="/cart/">*/}
                        {/*    Cart ({cartCount}) <i className="fas fa-shopping-cart"> </i>*/}
                        {/*</Link>*/}

                        {/*<button onClick={() => i18next.changeLanguage('uk')}>Українська</button>*/}
                        {/*<button onClick={() => i18next.changeLanguage('en')}>English</button>*/}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default BaseHeader;

