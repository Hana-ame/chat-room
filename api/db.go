package main

import (
	"fmt"
	"reflect"
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// public
func initDB() (err error) {
	db, err = gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	err = db.AutoMigrate(&GroupChats{})
	return
}

//================

// User
type User struct {
	Username string
	PassHash string
	Email    string
}

func GetUserByUsername(username string) (user User, err error) {
	user.Username = username
	if err := db.Where(&user).First(&user).Error; err != nil {
		fmt.Println("record not found")
	} else {
		fmt.Println(user)
	}
	return
}

// GroupChats
const N_MAX = 25

// TODO: change time.Time to time in order to return a timestamp than a string
// type Time struct {
// 	time.Time
// }

// func (t *Time) MarshalJSON() ([]byte, error) {
// 	timestamp := t.Unix()
// 	return []byte(strconv.FormatInt(timestamp, 10)), nil
// 	// return []byte(fmt.Sprintf("%d", timestamp)), nil
// }

// // Implement the Scanner interface for database scanning
// func (t *Time) Scan(value interface{}) error {
// 	if value == nil {
// 		t.Time = time.Time{}
// 		return nil
// 	}
// 	if v, ok := value.(time.Time); ok {
// 		t.Time = v
// 		return nil
// 	}
// 	return fmt.Errorf("failed to scan MyTime value")
// }

// // Implement the Valuer interface for database value conversion
// func (t *Time) Value() (driver.Value, error) {
// 	if t.Time.IsZero() {
// 		return nil, nil
// 	}
// 	return t.Time, nil
// }

// func (t *Time) GormDataType() string {
// 	return "TIME"
// }

type GroupChats struct {
	ID        uint           `gorm:"primarykey" json:"id"`
	CreatedAt time.Time      `json:"creatededAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
	Group     string         `json:"-"`
	Poster    string         `json:"poster"`
	Payload   string         `json:"payload"`
}

// type GroupChats struct {
// 	ID        uint      `json:"id"`
// 	CreatedAt time.Time `json:"createdAt"`
// 	UpdatedAt time.Time `json:"updatedAt"`
// 	Group     string    `json:"group"`
// 	Poster    string    `json:"poster"`
// 	Payload   string    `json:"payload"`
// }

func DeleteGroupChats(id uint) error {
	// Soft delete the user using Raw SQL
	tx := db.Exec("UPDATE `group_chats` "+
		" SET `deleted_at` = ? "+
		" WHERE id = ?", time.Now(), id)
	return tx.Error
	// if result.Error != nil {
	// log.Println("Error soft deleting the user:", result.Error)
	// return
	// }
}

func PostGroupChats(group, poster, payload string) error {
	tx := db.Create(&GroupChats{
		// CreatedAt: time.Now(),
		// UpdatedAt: time.Now(),
		Group:   group,
		Poster:  poster,
		Payload: payload,
	})
	return tx.Error // what is in tx?
}

func GetGroupChatsByLastN(group string, n int) ([]*GroupChats, error) {
	if n < 0 || n > N_MAX {
		n = N_MAX
	}
	var chats []*GroupChats
	condition := "`group` = ?"
	err := db.Order("id DESC").Where(condition, group).Limit(n).Find(&chats).Error
	reverseArray(chats)
	return chats, err
}

func GetGroupChatsByMinID(group string, minID int, n int) ([]*GroupChats, error) {
	if n < 0 || n > N_MAX {
		n = N_MAX
	}
	var chats []*GroupChats
	// condition := "`group` = ?"
	// err := db.Order("id ASC").Where(condition, group).Where("`id` > ?", minID).Limit(n).Find(&chats).Error
	err := db.Raw(" SELECT * FROM "+
		" (SELECT * FROM `group_chats` "+
		" WHERE `deleted_at` IS NULL AND `group` = ? "+
		" ORDER BY id DESC LIMIT ?) as t "+
		" WHERE id > ? LIMIT ?", group, N_MAX, minID, n).Find(&chats).Error
	reverseArray(chats)
	return chats, err
}
func GetGroupChatsByMaxID(group string, maxID int, n int) ([]*GroupChats, error) {
	if n < 0 || n > N_MAX {
		n = N_MAX
	}
	var chats []*GroupChats
	// condition := "`group` = ?"
	// err := db.Order("id DESC").Where(condition, group).Where("`id` < ?", maxID).Limit(n).Find(&chats).Error
	err := db.Raw("SELECT * FROM "+
		"(SELECT * FROM `group_chats` "+
		"WHERE `deleted_at` IS NULL AND `group` = ? "+
		"ORDER BY id DESC LIMIT ?) as t "+
		"WHERE id < ? LIMIT ?", group, N_MAX, maxID, n).Find(&chats).Error
	reverseArray(chats)
	return chats, err
}

//================

// utils
// which used in other files

// by chatGPT
func reverseArray(arr any) {
	arrValue := reflect.ValueOf(arr)
	swap := reflect.Swapper(arr)

	length := arrValue.Len()
	for i, j := 0, length-1; i < j; i, j = i+1, j-1 {
		swap(i, j)
	}
}

// func typeCasterArray(arr []GroupChats) []GroupChats {
// 	l := len(arr)
// 	rArr := make([]GroupChats, l)
// 	for i, v := range arr {
// 		rArr[i] = v.(any).(GroupChats)
// 	}
//  return rArr
// }
