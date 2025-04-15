package main

import (
	"fmt"
	"net/http"
)

func main() {
	home_dir := http.FileServer(http.Dir("./majaslapa"))

	http.Handle("/", home_dir)

	port := "8080"
	fmt.Printf("Server is running at http://localhost:%s\n", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		fmt.Println("Error starting server:", err)
	}
}
