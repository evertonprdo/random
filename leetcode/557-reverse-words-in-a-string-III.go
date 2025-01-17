package main

// The problem can be found on https://leetcode.com/problems/reverse-words-in-a-string-iii/description/
// Runtime: 0ms, Memory: 8.67MB

import (
	"fmt"
)

/**
 * To solve the problem I use the two pointer technique
 */
func reverseWords(s string) string {
	result := make([]byte, len(s))

	r, l := 0, 0

	for r <= len(s) {
		if r == len(s) || s[r] == ' ' {
			if r != len(s) {
				result[r] = s[r]
			}

			for i := r - 1; l < r; i, l = i-1, l+1 {
				result[l] = s[i]
			}

			l++
			r++
		} else {
			r++
		}
	}

	return string(result)
}

func main() {
	input := "Let's take LeetCode contest"
	output := reverseWords(input)
	fmt.Println(output)
}