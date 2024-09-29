import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import './App.css';
import { MyMeals } from './MyMeals';
import { addMeal, getAllMeals, editMeal, deleteMeal } from './FetchMeals';
import { gsap } from "gsap";
import { Footer } from './Footer';

function App() {
  const [myMeal, setMeal] = useState([]);
  const [mealName, setMealName] = useState("");
  const [editing, setEditing] = useState(false);
  const [mealId, setMealId] = useState("");

  const animation = useRef();
  const tl = useRef();

  useEffect(() => {
    getAllMeals(setMeal)
  }, [])

  const updatingInInput = (_id, mealName) => {
    setEditing(true)
    setMealName(mealName)
    setMealId(_id)
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline()
        .from("h1", {
          duration: 1, x: -50, ease: "power0.easeNone", opacity: 0
        })
        .from(".subheading", {
          duration: 0.8, x: -70, ease: "power0.easeNone", opacity: 0
        })
        .from(".input-box", {
          duration: 0.9, y: 50, ease: "power0.easeNone", opacity: 0
        })
        .from(".list", {
          duration: 0.5, y: 40, ease: "power0.easeNone", opacity: 0
        });
    }, animation);
    return () => ctx.revert()
  }, []);

  return (
    <div className='cover'>
      <div className='main-box' ref={animation}>
      <h1>Meal Plan</h1>
      <p className='subheading'>Start planning your meal today</p>
      <div className='input-box'>
      <input
      className='inputArea' 
      type='text'
      placeholder='Add your meal ...'
      value={mealName}
      onChange={(e) => setMealName(e.target.value)}
      />
      <button className='cta' 
      disabled={!mealName}
      onClick={editing ? () => editMeal(mealId, mealName, setMealName, setMeal, setEditing) : () => addMeal(mealName, setMealName, setMeal)}>
        {editing ? "Edit" : "Add"}
      </button>
      </div>
      <div className='list'>
      {myMeal.map((meal) => <MyMeals 
      text={meal.mealName} 
      key={meal._id} 
      updatingInInput={() => updatingInInput(meal._id, meal.mealName)}
      deleteMeal={() => deleteMeal(meal._id, setMeal)}
      />
      )}
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
