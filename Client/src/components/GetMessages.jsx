import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LikeButton from "./LikeButton.jsx";

export default function GetMessages() {
    const [filter, setFilter] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        getData("");
        getCategories();
    }, []);
    return (
        <div>
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
                        <h2 className="name">{post.name}</h2>
                        <h2 className="message">{post.message}</h2>
                        <h2 className="likes">{`Likes: ${post.likes}`}</h2>
                        <h2 className="likes">{post.id}</h2>
                        <LikeButton handleLike={handleLike} id={post.id} />
                    </div>
                );
            })}
        </div>
    );

    async function getData() {
        const data = await fetch(`http://localhost:8080/`);
        const json = await data.json();
        setFilter(json.sort((a, b) => a.id - b.id));
    }

    async function getCategories() {
        const data = await fetch("http://localhost:8080/categories");
        const json = await data.json();
        setCategories(json);
    }

    function handleChange(event) {
        setSearchParams({ category: event.target.value });
        filterData(event.target.value);
    }

    async function filterData(category) {
        if (category != 0) {
            const data = await fetch("http://localhost:8080/filter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ category: category }),
            });
            const json = await data.json();
            setFilter(json.sort((a, b) => a.id - b.id));
        } else {
            getData();
        }
        // setFilter(filter.sort((a, b) => a.id - b.id));
    }

    async function handleLike(value, id) {
        //if value = 1, +1 like, else -1 like
        const sendLike = await fetch("http://localhost:8080/likes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ like: value, id: id }),
        });
        const json = await sendLike.json();
        // console.log(json);
        filterData(searchParams.get("category"));
    }
}
