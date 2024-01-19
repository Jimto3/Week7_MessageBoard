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
    ]);
    return (
        <div
            className="navBar"
            style={{ gridTemplateColumns: `repeat(${nav.length}, 1fr)` }}
        >
            {nav.map((item) => {
                return (
                    <Link
                        onClick={handleNav(item.id)}
                        to={item.link}
                        key={item.id}
                        style={item.active ? { background: `red` } : {}}
                    >
                        <img className="navItem" src={item.url} />
                    </Link>
                );
            })}
        </div>
    );
    function handleNav(event, id) {
        // event.preventDefault();
        // nav.forEach((item) => {
        //     item.active = false;
        //     console.log(item, item.active);
        // });
        console.log(id);
        // nav[event.target.value.key] = true;
    }
}
