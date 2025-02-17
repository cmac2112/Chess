CC = gcc
CFLAGS = -Wall -Wextra -IC:/C/glew-2.1.0/include
LDFLAGS = -L"C:/C/glew-2.1.0/lib" -lopengl32 -lgdi32 -lwinmm

all: main.exe

main.exe: window.o
	$(CC) -o main.exe window.o $(LDFLAGS)

window.o: window.c
	$(CC) $(CFLAGS) -c window.c

clean:
	del *.o main.exe
