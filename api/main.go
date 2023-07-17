package main

import (
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"math/rand"
	"net/http"

	"github.com/kataras/iris/v12"
	"gorm.io/gorm"
)

var db *gorm.DB

func main() {
	initDB()

	app := iris.New()

	// Our custom CORS middleware.
	crs := func(ctx iris.Context) {
		ctx.Header("Access-Control-Allow-Origin", "*")
		ctx.Header("Access-Control-Allow-Credentials", "true")

		if ctx.Method() == iris.MethodOptions {
			ctx.Header("Access-Control-Methods",
				"GET, POST, PUT, PATCH, DELETE")

			ctx.Header("Access-Control-Allow-Headers",
				"Access-Control-Allow-Origin, Content-Type, *")

			ctx.Header("Access-Control-Max-Age",
				"86400")

			ctx.StatusCode(iris.StatusNoContent)
			return
		}

		ctx.Next()
	}

	app.UseRouter(crs)

	// [register routes...]

	api := app.Party("/api")
	api.Get("/user/new", getNewUser)
	// api.Post("/user/info", authorizeUser)
	api.Get("/group/{group}", getGroupInfo)
	api.Get("/group/{group}/messages", getGroupChats)
	api.Post("/group/{group}/messages", postGroupChats)

	app.Listen("127.100.0.2:8080")
}

// user
func getNewUser(ctx iris.Context) {
	username := generateID()
	passhash := generatePass(username)
	ctx.SetCookie(&http.Cookie{
		Name:     "user",
		Value:    username,
		HttpOnly: false,
		Path:     "/",
	})
	ctx.SetCookie(&http.Cookie{
		Name:     "pass",
		Value:    passhash,
		HttpOnly: false,
		Path:     "/",
	})
	// edit it later to add callback url
	ctx.Redirect("https://chat.moonchan.xyz/setcookie"+"?user="+username+"&pass="+passhash, iris.StatusFound)
}

// func authorizeUser(ctx iris.Context) {
// 	username := ctx.GetCookie("user")
// 	user, err := GetUserByUsername(username)
// 	if err != nil {
// 		ctx.StopWithProblem(iris.StatusBadRequest, iris.NewProblem().
// 			Title("Failed to find user").DetailErr(err))
// 		return
// 	}
// 	ctx.JSON(user)
// }

// GroupChats

func getGroupInfo(ctx iris.Context) {
	ctx.StopWithProblem(iris.StatusBadRequest, iris.NewProblem().
		Title("chats failure").DetailErr(errors.New("not supported")))
	return
}

func getGroupChats(ctx iris.Context) {
	// /group/{group}/messages?min_id=123 // get chats greater than 123 (for get new chats)
	// /group/{group}/messages 					// get latest chats
	group := ctx.Params().Get("group")
	minID := ctx.URLParamIntDefault("min_id", -1)
	maxID := ctx.URLParamIntDefault("max_id", -1)
	n := ctx.URLParamIntDefault("n", 100)

	// log.Println(group, minID, n)

	chats, err := func() ([]*GroupChats, error) {
		if minID < 0 && maxID < 0 {
			return GetGroupChatsByLastN(group, n)
		}
		if minID >= 0 {
			return GetGroupChatsByMinID(group, minID, n)
		}
		if maxID >= 0 {
			return GetGroupChatsByMaxID(group, maxID, n)
		}
		return GetGroupChatsByLastN(group, n)
	}()
	if err != nil {
		ctx.StopWithProblem(iris.StatusBadRequest, iris.NewProblem().
			Title("chats failure").DetailErr(err))
		return
	}

	ctx.JSON(chats)
}

// a new post
func postGroupChats(ctx iris.Context) {
	group := ctx.Params().Get("group")
	poster := ctx.GetCookie("user")
	pass := ctx.GetCookie("pass")
	// log.Println(poster, pass)
	if !checkPass(poster, pass) {
		ctx.StopWithProblem(iris.StatusUnauthorized, iris.NewProblem().
			Title("Unauthorized").DetailErr(errors.New("not authorized")))
		return
	}
	bodyBytes, err := ctx.GetBody()
	if err != nil {
		// Handle the error
		ctx.StopWithProblem(iris.StatusBadRequest, iris.NewProblem().
			Title("Failed to read request body").DetailErr(err))
		return
	}
	PostGroupChats(group, poster, string(bodyBytes))
}

//================

// utils

// from shijima.go
func generateID() (s string) {
	for i := 0; i < 7; i += 1 {
		s += string(alphabet[rand.Intn(len(alphabet))])
	}
	// fmt.Println(s)
	return
}

// auth
func checkPass(user, pass string) bool {
	return pass == generatePass(user)
}

func generatePass(username string) string {
	pass := sha256Hash(username + SALT)
	return pass
}

// by chatGPT
// generate sha256 HASH
func sha256Hash(input string) string {
	// create a new SHA256 hash object
	hasher := sha256.New()

	// write the input string to the hash object
	hasher.Write([]byte(input))

	// compute the SHA256 hash
	hash := hasher.Sum(nil)

	// convert the hash to a hex string
	hashString := hex.EncodeToString(hash)

	// return the hash string
	return hashString
}
