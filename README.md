# Simple Blockchain-Based Diary

## Table of Contents

- [Simple blockchain-based diary](#simple-blockchain-based-diary)
- [Project Description](#project-description)
- [Project Vision](#project-vision)
- [Future Scope](#future-scope)
- [Key Features](#key-features)

## Simple blockchain-based diary

The **Simple Blockchain-Based Diary** provides a secure and private way for users to store their diary entries on the Ethereum blockchain. The entries are encrypted, ensuring that the content is private and can only be viewed by the user who created them. The diary is tamper-proof, and the entries are stored immutably, ensuring that no one, including the user themselves, can alter the history of their entries.

## Project Description

The **Simple Blockchain-Based Diary** allows users to:
- **Encrypt Diary Entries**: Store encrypted diary entries to maintain privacy and security.
- **Add New Entries**: Users can add new entries to their diary with an encrypted title and content.
- **Update Existing Entries**: Users can modify their own entries, which will also be encrypted to maintain privacy.
- **Read Entries**: Users can read their entries by decrypting them off-chain using the key.
- **Security**: The contract ensures that only the user who created the entry can modify or read it, preserving privacy and security.

## Project Vision

The project’s vision is to enable users to store their personal diary entries securely and privately on the blockchain. By utilizing encryption, users can ensure that their diary contents are never exposed to anyone, including potential attackers, third parties, or even the contract creator.

The project is intended for individuals who want to store private, tamper-proof personal data in a secure, decentralized way. By leveraging blockchain's inherent immutability, we ensure that each diary entry is permanently stored and cannot be altered or deleted.

## Future Scope

1. **Client-side Encryption**: Further enhance privacy by enabling users to encrypt their data off-chain and only store encrypted data on-chain.
2. **Access Control Features**: Implement access controls that would allow users to share specific entries with others, such as friends or family, or keep them completely private.
3. **User Authentication**: Integrate with decentralized identity protocols to authenticate users in a more secure and decentralized manner.
4. **Decryption Mechanism**: Provide an off-chain solution or dApp that allows users to securely decrypt their diary entries for reading or modification.
5. **Event Notifications**: Add event notifications to alert users when a new entry is added or an entry is updated.

## Key Features

- **Encrypted Diary Entries**: All diary entries are stored encrypted on the blockchain, ensuring privacy and security.
- **Immutability**: Once stored on the blockchain, entries cannot be altered or deleted, ensuring that the user's personal history is permanent and secure.
- **Ownership Control**: Each user has full control over their own diary entries. Only the user who created the entry can modify or view it.
- **Decentralization**: The data is stored on the blockchain, removing the reliance on any centralized service or entity, enhancing privacy and resilience.
- **Gas Optimized**: The contract is designed to be efficient and reduce gas costs by using efficient data types and modifiers.
