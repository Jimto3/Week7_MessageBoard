import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
    const [nav, setNav] = useState([
        {
            id: 0,
            link: "/",
            url: "https://www.iconpacks.net/icons/2/free-home-icon-2502-thumb.png",
            active: true,
        },
        {
            id: 1,
            link: "/posts",
            url: "https://static.thenounproject.com/png/1453176-200.png",
            active: false,
        },
        {
            id: 2,
            link: "/addPost",
            url: "https://www.pngall.com/wp-content/uploads/10/Plus-Symbol-Vector-PNG-Picture.png",
            active: false,
        },
        {
            id: 3,
            link: "/loginPage",
            url: "https://www.iconpacks.net/icons/1/free-key-icon-920-thumb.png",
            active: false,
        },
    ]);
    return (
        <div
            className="navBar"
            style={{ gridTemplateColumns: `repeat(${nav.length}, 1fr)` }}
        >
            {nav.map((item) => {
                return (
                    <Link
                        onClick={() => handleNav(item.id)}
                        to={item.link}
                        key={item.id}
                        style={item.active ? { background: `purple` } : {}}
                    >
                        <img className="navItem" src={item.url} />
                    </Link>
                );
            })}
        </div>
    );
    function handleNav(id) {
        const newActive = nav.map((item) => {
            if (item.id != id) {
                return { ...item, active: false };
            } else return { ...item, active: true };
        });
        setNav(newActive);
    }
}
