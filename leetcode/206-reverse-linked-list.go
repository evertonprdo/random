package main

// Definition for singly-linked list.
type ListNode struct {
   Val int
   Next *ListNode
}

// Runtime: 0ms, Memory: 4.68MB
func reverseList(head *ListNode) *ListNode {
	if head == nil || head.Next == nil {
		return head
  	}

  	var prev *ListNode = nil

  	for head != nil {
		prev = &ListNode{
			 Val:  head.Val,
			 Next: prev,
		}
		head = head.Next
  	}

  	return prev
}

// Runtime: 0, Memory: 4.49MB
func reverseList2(head *ListNode) *ListNode {
	if head == nil || head.Next == nil {
	  	return head
  	}
  	var prev *ListNode
  	for head != nil {
	  	temp := head.Next
	  	head.Next = prev
	  	prev = head
	  	head = temp
  	}
  	return prev
}