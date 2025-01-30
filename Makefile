all: main.c
	gcc -Wall -Werror -o main main.c -lgdi32 -lwinmm