package main

import (
	"fmt"
	"net"
	"net/http"
)

func main() {
	home_dir := http.FileServer(http.Dir("./majaslapa"))

	http.Handle("/", home_dir)

	port := "8080"
	fmt.Printf("Server is running at http://%s:%s\n", get_local_ip(), port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		fmt.Println("Error starting server:", err)
	}
}

func get_local_ip() string {
	interfaces, err := net.Interfaces()
	if err != nil {
		fmt.Println("Error getting network interfaces:", err)
		return ""
	}

	for _, iface := range interfaces {
		// Skip down or loopback interfaces
		if iface.Flags&net.FlagUp == 0 || iface.Flags&net.FlagLoopback != 0 {
			continue
		}

		addrs, err := iface.Addrs()
		if err != nil {
			fmt.Println("Error getting addresses:", err)
			continue
		}

		for _, addr := range addrs {
			var ip net.IP
			switch v := addr.(type) {
			case *net.IPNet:
				ip = v.IP
			case *net.IPAddr:
				ip = v.IP
			}

			// Skip loopback and non-IPv4 addresses
			if ip == nil || ip.IsLoopback() || ip.To4() == nil {
				continue
			}

			return ip.String()
		}
	}

	fmt.Println("No IPv4 address found.")
	return ""
}
