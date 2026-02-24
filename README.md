---------- Answers to Questions   -----
  
  1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
  ans :- 
  the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll,  getElementById is Selects an element using its id only one element.
  ID  are unique, so it always targets a single element. it is usually very fast getElementsByClassName Selects elements using a class name multiple elements using .
  querySelector Selects elements using a class name Selects one element only .
  querySelectorAll Selects all matching elements. using a static NodeList.  using  one or many elements. 
  
  3. How do you create and insert a new element into the DOM?
  ans:-
  To create and  a new element into the DOM using JavaScript,
  and add new  style for textContent and add by  classList style add  and content  Place (appendChild)

  3. What is Event Bubbling? And how does it work?
    ans : -
  Event Bubbling is a process where an event (such as a click) first occurs on the element, and then gradually propagates upward to its parent element. fast work by child work and  upward do  work by parent

  4. What is Event Delegation in JavaScript? Why is it useful?
   ans :-
  Event delegation the practice of  adding a single parent element adding  multiple child elements individual and a by dom parent .
  Performance Improvement: This is especially useful when dealing with a large number of elements or when dynamically adding/removing elements.

  6. What is the difference between preventDefault() and stopPropagation() methods?
     ans :-
     One stops stopPropagation() methods and  event preventDefault()  traveling  stop .
    using preventDefault()  event stops specific actions from  traveling occurring stop .
    topPropagation() the event right where stops from preventing .
