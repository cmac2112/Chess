CC = g++
CFLAGS = -Wall -Wextra -I"C:\C"
LDFLAGS = -L"C:\C" -lglew32 -lopengl32 -lgdi32 -lwinmm

all: main

main: window.o
    $(CC) -o main window.o $(LDFLAGS)

window.o: window.c
    $(CC) $(CFLAGS) -c window.c

clean:
    del *.o main.exe