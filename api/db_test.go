package main

import (
	"encoding/json"
	"fmt"
	"log"
	"testing"
)

func TestSomething(t *testing.T) {
	initDB()

	gc, _ := GetGroupChatsByMinID("1", 1, 1)
	for _, v := range gc {
		fmt.Println(*v)
	}
	j, _ := json.Marshal(gc)
	fmt.Printf("%s", j)
}

func TestMinID(t *testing.T) {
	initDB()

	log.Println(GetGroupChatsByMinID("g", 1, 9))
	log.Println(GetGroupChatsByMinID("g", 2, 9))
	log.Println(GetGroupChatsByMinID("g", 3, 9))
	log.Println(GetGroupChatsByMinID("g", 34, 9))
}

func TestLastN(t *testing.T) {
	initDB()

	log.Println(GetGroupChatsByLastN("g", 1))
	log.Println(GetGroupChatsByLastN("g", 2))
	log.Println(GetGroupChatsByLastN("g", 3))
	log.Println(GetGroupChatsByLastN("g", 4))
	log.Println(GetGroupChatsByLastN("5", 4))
}

func TestConn(t *testing.T) {
	initDB()

	db.Create(&GroupChats{Group: "g", Poster: "p", Payload: "sth"})
	db.Create(&GroupChats{Group: "g", Poster: "p", Payload: "sth2"})

}
