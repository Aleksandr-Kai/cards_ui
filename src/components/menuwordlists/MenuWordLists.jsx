import React, { useEffect, useState } from "react";
import classNames from "classnames";
import classes from "./menuwordlists.module.css";
import { apiRequest, getRequest, postRequest } from "../../apitools.js";
import EditList from "../../components/editlist/EditList";

async function requestLists(callback) {
    getRequest("/lists")
        .then((data) => {
            if (data.error) {
                return Promise.reject({ message: data.error });
            }
            return data.Lists;
        })
        .then(callback)
        .catch((err) => {
            console.log(err.message);
            callback([]);
        });
}

async function requestWords(list) {
    return getRequest(`/lists/${list.id}/words`).then((data) => {
        return {
            id: list.id,
            name: list.name,
            words: data.Words,
        };
    });
}

function filterUnstudiedWords(words) {
    return words.filter((word) => !word.studied);
}

const MenuWordLists = ({ className, onSelect, ...props }) => {
    const [lists, setLists] = useState([]);
    const [editList, setEditList] = useState(null);

    const [hover, setHover] = useState(null);
    const [listDetails, setListDetails] = useState(null);
    const [newListName, setNewListName] = useState(null);

    useEffect(() => {
        requestLists(setLists);
    }, []);

    const selectList = (list) => {
        requestWords(list)
            .then((data) => filterUnstudiedWords(data.words))
            .then((words) =>
                words.map((word) => {
                    return {
                        id: word.id,
                        word: word.word,
                        meaning: word.translation,
                    };
                })
            )
            .then(onSelect);
    };

    // Create New List in database
    const addNewList = () => {
        postRequest("/lists", { listName: newListName })
            .then(() => {
                requestLists(setLists);
            })
            .catch((err) => {
                console.log(err);
            })
            .then(() => {
                setNewListName(null);
            });
    };

    const mouseOver = (list) => {
        if (hover) clearTimeout(hover);
        setHover(
            setTimeout(() => {
                setHover(null);
                requestWords(list).then((data) =>
                    setListDetails({ listId: list.id, words: data.words })
                );
            }, 500)
        );
    };

    const deleteList = (event) => {
        event.stopPropagation();
        const target = event.target.parentElement.parentElement;
        const listId = target.getAttribute("id");
        apiRequest("DELETE", `/lists/${listId}`)
            .then((resp) => {
                if (resp.error === undefined) requestLists(setLists);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const updateList = (listId, words) => {
        const list = { create: [], update: [], delete: [] };
        words
            .filter((item) => item.action)
            .forEach(({ id, action, ...word }) => {
                list[action].push(action === "create" ? word : { ...word, id });
            });
        const promises = [];

        list.delete.forEach((word) => {
            promises.push(
                apiRequest("DELETE", `/lists/${listId}/words/${word.id}`)
            );
        });

        list.update.forEach((word) => {
            promises.push(
                apiRequest("PUT", `/lists/${listId}/words/${word.id}`, {
                    Word: word,
                })
            );
        });

        promises.push(
            apiRequest("POST", `/lists/${listId}/words`, {
                words: list.create,
            })
        );

        return Promise.all(promises);
    };

    const mout = () => {
        if (hover) {
            clearTimeout(hover);
            setHover(null);
        }
        setListDetails(null);
    };

    return Boolean(editList) ? (
        <EditList
            className={className}
            data={editList.words}
            defaultRow={{ id: 0, word: "", translation: "", studied: false }}
            listUpdate={(list) => {
                if (list) {
                    updateList(editList.id, list)
                        .then(() => console.log("List updated"))
                        .catch((err) => alert(err));
                }
                setEditList(null);
            }}
        />
    ) : (
        <nav
            className={classNames(classes.container, className)}
            {...props}
            onClick={(event) => {
                event.stopPropagation();
                setNewListName(null);
            }}
        >
            {lists.map((list) => (
                <div
                    className={classNames(classes.listName, classes.menuItem)}
                    key={list.id}
                    id={list.id}
                    onMouseOver={() => mouseOver(list)}
                    onMouseOut={mout}
                    onClick={(e) => {
                        e.stopPropagation();
                        selectList(list);
                    }}
                >
                    <div className={classes.listBtnBlock}>
                        <div
                            className={classes.listButton}
                            onClick={deleteList}
                        >
                            Del
                        </div>
                        <div
                            className={classes.listButton}
                            onClick={(event) => {
                                event.stopPropagation();
                                requestWords(list).then(setEditList);
                            }}
                        >
                            Edit
                        </div>
                    </div>
                    {list.name}
                    {Boolean(listDetails) && listDetails.listId == list.id && (
                        <ul className={classes.listWords}>
                            {listDetails.words.length > 0 &&
                                listDetails.words
                                    .filter((word) => !word.studied)
                                    .map((word) => (
                                        <li key={word.id}>{word.word}</li>
                                    ))}
                        </ul>
                    )}
                </div>
            ))}
            <div
                className={classes.menuItem}
                key={-1}
                id={-1}
                onClick={
                    newListName === null
                        ? (event) => {
                              event.stopPropagation();
                              setNewListName("");
                          }
                        : null
                }
            >
                {newListName === null ? (
                    "Add new list"
                ) : (
                    <>
                        <input
                            type="text"
                            onChange={(event) =>
                                setNewListName(event.target.value)
                            }
                            autoFocus={true}
                            onKeyDown={(event) => {
                                event.key === "Enter" && addNewList();
                            }}
                        ></input>
                        <button
                            onClick={(event) => {
                                event.stopPropagation();
                                addNewList();
                            }}
                        >
                            Ok
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default MenuWordLists;
