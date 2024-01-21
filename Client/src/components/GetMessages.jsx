import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LikeButton from "./LikeButton.jsx";

export default function GetMessages({ user_id }) {
    const [filter, setFilter] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams({ category: 0 });
    useEffect(() => {
        getData("");
        getCategories();
    }, []);
    return (
        <div
            style={{
                display: `flex`,
                alignItems: `center`,
                flexDirection: `column`,
            }}
        >
            <form>
                <label>Category: </label>
                <select
                    value={searchParams.get("category") || ""}
                    onChange={handleChange}
                >
                    {
                        <option key="none" value="0">
                            No Filter
                        </option>
                    }
                    {categories.map((category) => {
                        return (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        );
                    })}
                </select>
            </form>
            {filter.map((post) => {
                return (
                    <div key={post.id + post.name} className="messageBox">
                        <div className="messageHead">
                            <h2 className="name" style={{ margin: "0" }}>
                                {post.name}
                            </h2>
                            <div className="likeBox">
                                <h2 className="likes">{post.likes}</h2>
                                <>
                                    {user_id != 0 ? (
                                        <LikeButton
                                            handleLike={handleLike}
                                            id={post.id}
                                            user_id={user_id}
                                        />
                                    ) : (
                                        <h5>Login to like posts!</h5>
                                    )}
                                </>
                            </div>
                        </div>
                        <h2 className="message">{post.message}</h2>
                    </div>
                );
            })}
        </div>
    );

    async function getData() {
        const data = await fetch(`https://messageboard-server.onrender.com/`);
        const json = await data.json();
        setFilter(json.sort((a, b) => a.id - b.id));
    }

    async function getCategories() {
        const data = await fetch(
            "https://messageboard-server.onrender.com/categories"
        );
        const json = await data.json();
        setCategories(json);
    }

    function handleChange(event) {
        setSearchParams({ category: event.target.value });
        filterData(event.target.value);
    }

    async function filterData(category) {
        if (category != 0) {
            const data = await fetch(
                "https://messageboard-server.onrender.com/filter",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ category: category }),
                }
            );
            const json = await data.json();
            setFilter(json.sort((a, b) => a.id - b.id));
        } else {
            getData();
        }
        // setFilter(filter.sort((a, b) => a.id - b.id));
    }

    async function handleLike(value, id) {
        //if value = 1, +1 like, else -1 like
        await fetch("https://messageboard-server.onrender.com/likes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ like: value, id: id, user_id: user_id }),
        });
        filterData(searchParams.get("category"));
    }
}
