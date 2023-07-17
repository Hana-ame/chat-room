package main

import (
	"encoding/json"
	"fmt"
	"testing"

	"github.com/iancoleman/orderedmap"
	"github.com/kataras/iris/v12"
)

func TestOrderedMap(t *testing.T) {
	o := orderedmap.New()
	if err := json.Unmarshal([]byte(`{"a":123}`), &o); err != nil {
		t.Error(err)
	}
	bytes, err := json.Marshal(o)
	if err != nil {
		t.Error(err)
	}
	fmt.Println(string(bytes))
}

// by chatGPT
// the later function has higher priority
func TestXxx(t *testing.T) {

	// 定义一个结构体来表示用户
	type User struct {
		ID   int    `json:"id"`
		Name string `json:"name"`
	}

	// 模拟用户数据
	var users = []User{
		{ID: 1, Name: "Alice"},
		{ID: 2, Name: "Bob"},
		{ID: 3, Name: "Charlie"},
	}

	func() {
		app := iris.New()

		// 将静态文件目录设置为 "dist"
		app.HandleDir("/", "../chat-room-dist", iris.DirOptions{
			IndexName: "index.html",
		})

		// 定义一个 API 路由，返回用户列表
		app.Get("/api/users", func(ctx iris.Context) {
			// 将用户列表转换为 JSON 格式，并返回给客户端
			ctx.JSON(users)
		})

		// 启动服务器并监听端口
		app.Run(iris.Addr("127.0.0.1:8080"))
	}()
}
