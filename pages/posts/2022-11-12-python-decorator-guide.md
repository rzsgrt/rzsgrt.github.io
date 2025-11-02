---
title: Python Decorator
date: November 11, 2022
---

Decorator is one of design pattern type. It allow you to add additional functionality to your function or class. For note:this functionality should be out of scope your function, because your function should have one thing to do. And to achieve this, we just create function that accept main function as argument

---

For simple start, we create one simple function that print hello world

```python
def hello_world():
    print("hello world!")
```

This function just print one line, takes no input and return none. We decide that **scope of this function is to print only one line hello world.** Now, if we want to call hello world function twice, we create another function to call hello_world function. Why we can pass function as function argument Because in **python we treat function as any other variable**.

```python
def repeat(fn):
    fn()
    fn()

def hello_world():
    print("hello world!")

# Call repeat function with argument hello_world function
repeat(hello_world)
```

Output:

```bash
>> hello world!
>> hello world!
```

As mentioned in first paragraph that decorator can add function functionality, we can try add another print statement (let say this is another functionality) inside repeat function. but now we also create wrapper inside repeat function. In code below, function repeat_with_wrapper return wrapper_fn. So first we assign it to variable then we call it as function. (this behavior inline with statement function as variable above).

```python
def repeat_with_wrapper(fn):
    def wrapper_fn():
        fn()
        print("print another word")
        fn()
    return wrapper_fn

def hello_world():
    print("hello world!")

repeat_wrapper = repeat_with_wrapper(hello_world) 
repeat_wrapper()

# same behavior
hello_world = repeat_with_wrapper(hello_world) 
hello_world()
```

output

```bash
>> hello world!
>> print another word
>> hello world!
```

Code above not efficient and redundant if you working on bigger codebase. So turns out we can simplify using `@repeat_with_wrapper` above function hello_world. So, code above could be simplified to

```python
def repeat_with_wrapper(fn):
    def decorated_fn():
        fn()
        print("print another word")
        fn()
    return decorated_fn


@repeat_with_wrapper
def hello_world():
    print("Hello world!")

hello_world()
```

&nbsp;  
&nbsp;  
And that decorator in python! As written above, we can add another functionality to main function. From now on we can identify if we saw `@` above function in python. We already know how to create simple decorator. But what if our function more complex and need argument? The answer: we modify it by passing
**`*args, **kwargs`** to our wrapper function.  
&nbsp;  

```python
def repeat_with_wrapper(fn):
    def decorated_fn(*args, **kwargs):
        print("print another word")
        fn(*args, **kwargs)
    return decorated_fn

@repeat_with_wrapper
def hello_world(name: str):
    print(f"Hello {name}!")

hello_world("Reza")
```

Output:

```bash
Hello Reza!
```

&nbsp;  
&nbsp;  
I hope we can identify or create some decorator. Now let's see some python built-in decorator.

1.@staticmethod  
As its name, @staticmethod transform method into static method. It allow us use method inside class without create any class instance. For example:

```python
class SampleClass:
    @staticmethod
    def get_today_date()
    ...

# You can access get_total_data by
# Method 1
sample = SampleClass()
sample.get_today_date()
# Method 2
SampleClass.get_today_date()
```

2.@classmethod  
Similar with staticmethod, @classmethod transform a method into a class method. This class method also known as factory method, or to construct class itself. For example:

```python
from datetime import date
class User:
    def __init__(self,name,age):
    ...

    @classmethod
    def fromBirthYear(self,cls,name,birth_year):
        return cls(name,date.today().year - birth_year) 

# To create class
User('Lorem',40)
User.fromBirthYear('Ipsum',1950)
```

3.@property
This decorator name really self explanatory. You need these to get attribute

```python
class Dog:
    ...
    @property #Getter
    def weight(self):
        return self.weight

oleng = Dog()
poleng.weight
```

&nbsp;  
&nbsp;  
So far we talked about decorator in function and function as decorator, but can we create decorator in class or can we create decorator from class?

Most known decorator for class is dataclass. You will see how it works by sample code below:

```python
from dataclass import dataclass

@dataclass #Decorator for whole class
class User:
    name:str
    age:int
    bio: str

# equivalent with
class User:
    def __init__(self,name:str,age:int,bio:str):
        self.name = name
        self.age = age
        self.bio = bio
```

Now what if we want to make decorator from class? Well first, the principle still same with decorator for function. but now we need to pass **`func`** to class and implement method **`__call__`**

```python
import functools

class LoremIpsum:
    def __init__(self,func):
        functools.update_wrapper(self, func)
    
    def __call__(self, *args, **kwargs): #Argument for function
        print("Class as decorator")
        return self.func(*args, **kwargs)

@LoremIpsum
def class_decorator():
    ....
```

&nbsp;  
&nbsp;  
That's all! In real world application you might find useful usage of decorator like [compiling using jit](https://numba.pydata.org/numba-doc/latest/user/jit.html) or using decorator for [caching](https://docs.python.org/3/library/functools.html)

---

Source:  

- A Gentle Introduction to Decorators in Python [link](https://machinelearningmastery.com/a-gentle-introduction-to-decorators-in-python/)  
- Decorator Design Pattern [link](https://sourcemaking.com/design_patterns/decorator)  
- Python Decorators [link](https://www.scaler.com/topics/python/python-decorators/)  
- Built-in Functions [link](https://docs.python.org/3/library/functions.html)
- classmethod() in python [link](https://www.geeksforgeeks.org/classmethod-in-python/)
- Data Classes [link](https://docs.python.org/3/library/dataclasses.html)
