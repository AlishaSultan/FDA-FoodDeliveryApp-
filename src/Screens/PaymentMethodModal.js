// PaymentMethodModal.js
import React, { useState } from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet } from "react-native";

const PaymentMethodModal = ({ isVisible, closeModal, onSubmit, title }) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  const handleSubmit = () => {
    onSubmit(accountNumber, accountName);
    setAccountNumber("");
    setAccountName("");
    closeModal();
  };

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>{title}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Account Number"
          onChangeText={(text) => setAccountNumber(text)}
          value={accountNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Account Name"
          onChangeText={(text) => setAccountName(text)}
          value={accountName}
        />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default PaymentMethodModal;
