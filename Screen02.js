import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";

export default function Screen02() {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState("");
  const [newUserImage, setNewUserImage] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  //Get API
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      setUsers(storedUsers);
    } else {
      fetch("http://localhost:3000/user")
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
          localStorage.setItem("users", JSON.stringify(data));
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, []);

  //Insert
  const handleAddUser = () => {
    if (newUserName && newUserImage) {
      const newUser = { id: users.length + 1, name: newUserName, image: newUserImage };
      setUsers([...users, newUser]);
      setNewUserName("");
      setNewUserImage("");
      localStorage.setItem("users", JSON.stringify([...users, newUser]));
    } else {
      alert("Vui lòng nhập cả tên và ảnh.");
    }
  };
  // Delete
  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };
  //Select User
  const handleSelectUser = (userId) => {
    const selectedUser = users.find((user) => user.id === userId);
    setNewUserName(selectedUser.name);
    setNewUserImage(selectedUser.image);
    setSelectedUserId(userId);
  };
  //Update user
  const handleUpdate = () => {
    if (newUserName && newUserImage && selectedUserId !== null) {
      const updatedUsers = users.map((user) =>
        user.id === selectedUserId ? { ...user, name: newUserName, image: newUserImage } : user
      );
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setNewUserName("");
      setNewUserImage("");
      setSelectedUserId(null);
    } else {
      alert("Vui lòng chọn người dùng và nhập thông tin cập nhật.");
    }
  };
  return (
    <View style={styles.container}>
      {users.map((user) => (
        <View key={user.id}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => handleSelectUser(user.id)}>
              <Image style={{ width: 30, height: 30 }} source={require(`./assets/${user.image}`)} />
              <Text>{user.name}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleDeleteUser(user.id)}>
              <Text style={{ color: "red", marginLeft: 10 }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View>
        <TextInput
          placeholder="Nhập tên"
          value={newUserName}
          onChangeText={(text) => setNewUserName(text)}
        />
        <TextInput
          placeholder="Nhập ảnh"
          value={newUserImage}
          onChangeText={(text) => setNewUserImage(text)}
        />
        <TouchableOpacity style={{ padding: 5, backgroundColor: "gray" }} onPress={handleAddUser}>
          THÊM
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 5, backgroundColor: "gray" }} onPress={handleUpdate}>
          Update
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
