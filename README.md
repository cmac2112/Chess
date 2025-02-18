# Chess in C
i dont know how im going to build this or give it a UI but here we are. 
The journey of learning starts with the first step


creating it first in javascript through react first then figuring out how to do it in C.
All i can do is create a window and i dont know enough about C to do anything other than that at the moment, all tutorials are in C++ but i hate myself and i want to try this in C.



all: window.c
	gcc -Werror -o window window.c -lgdi32 -lwinmm