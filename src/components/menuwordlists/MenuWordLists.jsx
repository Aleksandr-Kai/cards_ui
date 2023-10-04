import React, { useEffect, useState } from "react";
import classNames from "classnames";
import classes from "./menuwordlists.module.css";
import { apiRequest, getRequest, postRequest } from "../../apitools.js";
import EditList from "../../components/editlist/EditList";

const MenuWordLists = ({ className, onSelect, ...props }) => {
    const [lists, setLists] = useState([]);
    const [editList, setEditList] = useState(null);

    const [hover, setHover] = useState(null);
    const [words, setWords] = useState(null);
    const [newListName, setNewListName] = useState(null);

    useEffect(() => {
        updateLists();
    }, []);

    const updateLists = () => {
        getRequest("/lists")
            .then((data) => {
                if (data.error) {
                    return Promise.reject({ message: data.error });
                }
                return data.Lists;
            })
            .then(async (rawLists) => {
                let result = [];
                let promises = rawLists.map((list) =>
                    getRequest(`/lists/${list.id}/words`).then((data) => {
                        result.push({
                            id: list.id,
                            name: list.name,
                            words: data.Words,
                        });
                    })
                );
                return Promise.all(promises).then(() => {
                    result.sort((a, b) => a.id - b.id);
                    setLists(result);
                });
            })
            .catch((err) => {
                console.log(err.message);
                setLists([]);
            });
    };

    const selectList = (event) => {
        event.stopPropagation();

        let id = event.target.getAttribute("id");
        getRequest(`/lists/${id}/words`).then((data) => {
            let words = data.Words.filter((word) => {
                return !word.studied;
            }).map((word) => {
                return {
                    id: word.id,
                    word: word.word,
                    meaning: word.translation,
                };
            });
            onSelect(words);
        });
    };

    const addNewList = (event) => {
        event.stopPropagation();

        postRequest("/lists", { listName: newListName })
            .then((resp) => {
                updateLists();
            })
            .catch((err) => {
                console.log(err);
            })
            .then(() => {
                setNewListName(null);
            });
    };

    const getWords = async (listId) => {
        if (!listId) return null;
        return getRequest(`/lists/${listId}/words`).then((data) => {
            let words = data.Words.filter((word) => !word.studied).map(
                (word) => word.word
            );
            return { listId, words };
        });
    };

    const mover = (event) => {
        if (hover) clearTimeout(hover);
        setHover(
            setTimeout(() => {
                setHover(null);
                getWords(event.target.getAttribute("id")).then((words) =>
                    setWords(words)
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
                if (resp.error === undefined) updateLists();
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
        setWords(null);
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
                    onMouseOver={mover}
                    onMouseOut={mout}
                    onClick={selectList}
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
                                setEditList(list);
                            }}
                        >
                            Edit
                        </div>
                    </div>
                    {list.name}
                    {Boolean(words) && words.listId == list.id && (
                        <ul className={classes.listWords}>
                            {words.words.length > 0 &&
                                words.words.map((word) => (
                                    <li key={word}>{word}</li>
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
                                event.key === "Enter" && addNewList(event);
                            }}
                        ></input>
                        <button onClick={addNewList}>Ok</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default MenuWordLists;
