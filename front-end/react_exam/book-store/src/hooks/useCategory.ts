import { useEffect, useState } from "react";
import { fetchCategory } from "../api/category.api";
import { Category } from "../models/category.model";
import { useLocation } from "react-router-dom";

export const useCategory = () => {
  const location = useLocation();
  const [category, setCategory] = useState<Category[]>([]);

  const setActive = () => {
    const params = new URLSearchParams(location.search);
    if(params.get('category')){
      setCategory((prev) => {
        return prev.map((item) => {
          return {
            ...item,
            isActive : item.bc_idx === Number(params.get('category')),
          }
        })
      })
    } else {
        setCategory((prev) => {
          return prev.map((item) => {
            return {
              ...item,
              isActive : false,
            }
          })
        })
    }
  }
  useEffect(()=>{
    fetchCategory().then((category) => {
      const categoryWithAll = [
        {
          bc_idx : null,
          bc_name : '전체',
        },
        ...category
      ]
      setCategory(categoryWithAll);
      setActive();
    })
  },[]);
  useEffect(() => {
    setActive();
  }, [location.search])
  return { category };
}