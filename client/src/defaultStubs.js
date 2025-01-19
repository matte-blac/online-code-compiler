const stubs = {}

stubs.cpp = `#include <stdio.h>   // Used for C
#ifdef __cplusplus
#include <iostream>   // Used for C++
#endif

int main() {
#ifdef __cplusplus
    std::cout << "Hello, World!" << std::endl; // C++ output
#else
    printf("Hello, World!"); // C output
#endif
    return 0;
}
`

stubs.py = `print("Hello, World!")`

export default stubs;