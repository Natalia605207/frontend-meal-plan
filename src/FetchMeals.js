import axios from 'axios';

const getAllMeals = (setMeal) => {
    axios.get("https://backend-meal-plan.onrender.com")
    .then(({ data }) => {
    setMeal(data)
    })
}

const addMeal = (mealName, setMealName, setMeal) => {
    axios.post("https://backend-meal-plan.onrender.com/saveMeals", { mealName })
    .then((data) => {
        setMealName("")
        getAllMeals(setMeal)
    })
}

const editMeal = (mealId, mealName, setMealName, setMeal, setEditing) => {
    axios.post("https://backend-meal-plan.onrender.com/editMeal", { _id:mealId, mealName })
    .then((data) => {
        setMealName("")
        setEditing(false)
        getAllMeals(setMeal)
    })
}

const deleteMeal = (_id, setMeal) => {
    axios.post("https://backend-meal-plan.onrender.com/deleteMeal", { _id })
    .then((data) => {
        getAllMeals(setMeal)
    })
}

export { getAllMeals, addMeal, editMeal, deleteMeal };