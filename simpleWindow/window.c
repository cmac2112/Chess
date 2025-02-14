#ifndef UNICODE
#define UNICODE
#endif 

#include <windows.h>
#include <GL/glew.h>

LRESULT CALLBACK WindowProc(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam);

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, PSTR szCmdLine, int iCmdShow)
{
    // Register the window class.
    const wchar_t CLASS_NAME[] = L"Sample Window Class";
    WNDCLASS wc = {0};
    wc.lpfnWndProc = WindowProc;
    wc.hInstance = hInstance;
    wc.lpszClassName = CLASS_NAME;
    wc.hbrBackground = (HBRUSH)(COLOR_WINDOW+1);
    wc.hCursor = LoadCursor(NULL, IDC_ARROW);
    wc.hIcon = LoadIcon(NULL, IDI_APPLICATION);
    wc.style = CS_HREDRAW | CS_VREDRAW;
    //WNDCLASS wc = { 0 };
    wc.lpfnWndProc   = WindowProc;
    wc.hInstance     = hInstance;

    if(!RegisterClass(&wc))
    {
        MessageBox(NULL, TEXT("This program requires Windows NT!"), L"ERROR", MB_ICONERROR | MB_OK);
        return 0;
    }

    // Create the window.

    HWND hwnd = CreateWindowEx(
        0,                              // Optional window styles.
        CLASS_NAME,                     // Window class
        L"Learn to Program Windows",    // Window text
        WS_OVERLAPPEDWINDOW,            // Window style

        // Size and position
        CW_USEDEFAULT, CW_USEDEFAULT, CW_USEDEFAULT, CW_USEDEFAULT,

        NULL,       // Parent window    
        NULL,       // Menu
        hInstance,  // Instance handle
        NULL        // Additional application data
        );

    if (hwnd == NULL)
    {
        return 0;
    }

    ShowWindow(hwnd, iCmdShow);
    UpdateWindow(hwnd);
    // Run the message loop.
    MSG msg = {0};
    while (GetMessage(&msg, NULL, 0, 0) > 0)
    {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }

    return msg.wParam;
}

LRESULT CALLBACK WindowProc(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam)
{

    switch (uMsg)
    {
    case WM_DESTROY:
        PostQuitMessage(0);
        return 0;

    case WM_PAINT:
        {
            PAINTSTRUCT ps;
            HDC hdc = BeginPaint(hwnd, &ps);
            
            // All painting occurs here, between BeginPaint and EndPaint.

            FillRect(hdc, &ps.rcPaint, (HBRUSH) (COLOR_WINDOW+1));
            DrawText(hdc, TEXT("Hello this is my window"), -1, &ps.rcPaint, DT_SINGLELINE | DT_CENTER | DT_VCENTER);
            EndPaint(hwnd, &ps);
            
        }
    case WM_CREATE:
        PlaySound(TEXT("C:\\Users\\ousoo\\Downloads\\Town of Lucent.wav"), NULL, SND_FILENAME | SND_ASYNC);

        return 0;

    }
    return DefWindowProc(hwnd, uMsg, wParam, lParam);
}