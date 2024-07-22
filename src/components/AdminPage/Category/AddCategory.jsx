import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "./../axiosConfig";
import "./../action.css";
import PageTitle from "./../../Other/PageTitle";

const AddCategory = () => {
    const [category, setCategory] = useState({
        category_name: "",
        image: null,
    });

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [fileName, setFileName] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setCategory((prevState) => ({
            ...prevState,
            image: file,
        }));
        setFileName(file ? file.name : "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in category) {
            formData.append(key, category[key]);
        }

        try {
            const res = await axios.post("/api/categories", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setResponse(res.data);
            setError(null);

            // Очистка полей после успешной отправки
            setCategory({
                category_name: "",
                image: null,
            });
            setFileName("");
        } catch (error) {
            setError(error);
            setResponse(null);
        }
    };

    return (
        <section className="section__adminpanel" id="section__adminpanel">
            <div className="container">
                <div className="adminpanel__head">
                    <PageTitle
                        titleClass="adminpanel__title"
                        title="Добавить категорию"
                    />
                    <Link
                        to="/admin"
                        className="adminpanel__return font-size-22 font-weight-500"
                    >
                        Вернуться обратно
                    </Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="category_name"
                            placeholder="Наименование категории"
                            value={category.category_name}
                            onChange={handleChange}
                            className="font-size-18"
                        />
                        <label className="upload-button font-size-18">
                            Загрузить фотографию
                            <input
                                type="file"
                                name="image"
                                onChange={handleImageChange}
                                style={{ display: "none" }}
                            />
                        </label>
                        {fileName && (
                            <div className="file-name font-size-18">
                                {fileName}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="submit-button font-size-18 font-weight-500"
                    >
                        Создать
                    </button>
                </form>
                {response && (
                    <div className="response-message">
                        <p>
                            <span>Категория успешно добавлена!</span>ID:{" "}
                            {response._id}
                        </p>
                    </div>
                )}
                {error && (
                    <div className="error-message">
                        <p>
                            <span>Ошибка при добавлении категории:</span>
                            {error.message}
                        </p>
                    </div>
                )}
                <div className="adminpanel__bottom">
                    <Link to="/admin" className="font-size-18">
                        Главная страница
                    </Link>
                    <p className="font-size-18">Добавление категории</p>
                </div>
            </div>
        </section>
    );
};

export default AddCategory;