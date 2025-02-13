all: main.c
	gcc -Werror -o main main.c -lgdi32 -lwinmm