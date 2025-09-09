


#### 1) What is the difference between var, let, and const?

answer: From my understanding, var is function-scoped and allows re-declaration, which can sometimes lead to unexpected behavior. I usually avoid it unless I’m working with older code. On the other hand, let and const are block-scoped, which makes them safer and more predictable. I use let when I know the value might change, and const when I want to keep it fixed. One thing to note—const doesn’t mean the value itself is immutable, just that the reference can’t be reassigned.



#### 2) What is the difference between map(), forEach(), and filter()?

answer: These three methods are super useful when working with arrays. I use forEach() when I just want to loop through items and perform actions like logging—since it doesn’t return anything. map() is great when I want to transform each item and get a new array. And filter() helps me pick out only the items that meet a certain condition.
 So basically:
 
- forEach() → for running side effects like logging
- map() → for transforming each item and returning a new array
- filter() → for selecting items based on a condition




#### 3) What are arrow functions in ES6?

answer: Arrow functions are a cleaner and shorter way to write functions using the => syntax. I find them especially useful in callbacks because they don’t have their own this context, which avoids a lot of confusion.

 For example:  const add = (a, b) => a + b;


#### 4) How does destructuring assignment work in ES6?
answer:
Destructuring lets me extract values from arrays or objects and assign them to variables in a neat, readable way. It saves me from writing repetitive code and makes things more elegant. 

For example:
- const [x, y] = [10, 20];
- const { name, age } = { name: "Sara", age: 30 };


#### 5) Explain template literals in ES6. How are they different from string concatenation?

Template literals use backticks (`) instead of quotes, and they allow me to embed variables directly using ${}. This makes my code much cleaner and easier to read, especially when dealing with dynamic strings. I also love that I can write multi-line strings without using escape characters.


Difference from String Concatenation:
- Easier to read and write, especially with variables and expressions.
- Supports multi-line strings without escape characters.
- Reduces syntax clutter compared to using + for concatenation.
















    







        
  





