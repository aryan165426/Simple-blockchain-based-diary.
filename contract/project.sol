// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleDiary {

    // Struct to represent a Diary Entry
    struct DiaryEntry {
        bytes32 encryptedTitle;  // Encrypted title of the entry
        bytes32 encryptedContent;  // Encrypted content of the entry
        uint256 timestamp;
    }

    // Mapping to store each user's diary entries by address
    mapping(address => DiaryEntry[]) private diaryEntries;

    // Events for tracking changes to entries
    event NewEntry(address indexed user, uint256 indexed entryId, uint256 timestamp);
    event EntryUpdated(address indexed user, uint256 indexed entryId, uint256 timestamp);

    // Modifier to ensure only the owner of the diary entry can access it
    modifier onlyOwner(uint256 entryId) {
        require(diaryEntries[msg.sender].length > entryId, "Entry does not exist");
        _;
    }

    // Function to add a new diary entry (requires encrypted data to ensure privacy)
    function addEntry(bytes32 encryptedTitle, bytes32 encryptedContent) public {
        uint256 entryId = diaryEntries[msg.sender].length;
        
        diaryEntries[msg.sender].push(DiaryEntry({
            encryptedTitle: encryptedTitle,
            encryptedContent: encryptedContent,
            timestamp: block.timestamp
        }));

        emit NewEntry(msg.sender, entryId, block.timestamp);
    }

    // Function to update an existing diary entry
    function updateEntry(uint256 entryId, bytes32 encryptedTitle, bytes32 encryptedContent) public onlyOwner(entryId) {
        DiaryEntry storage entry = diaryEntries[msg.sender][entryId];
        
        entry.encryptedTitle = encryptedTitle;
        entry.encryptedContent = encryptedContent;
        entry.timestamp = block.timestamp;

        emit EntryUpdated(msg.sender, entryId, block.timestamp);
    }

    // Function to retrieve a specific diary entry
    function getEntry(uint256 entryId) public view onlyOwner(entryId) returns (bytes32, bytes32, uint256) {
        DiaryEntry memory entry = diaryEntries[msg.sender][entryId];
        return (entry.encryptedTitle, entry.encryptedContent, entry.timestamp);
    }

    // Function to get the total number of diary entries the user has
    function getEntriesCount() public view returns (uint256) {
        return diaryEntries[msg.sender].length;
    }

    // Internal function to verify the user’s address (simplified version, could be enhanced)
    function _isValidUser(address user) internal pure returns (bool) {
        return user != address(0);  // Ensure the address is not a zero address
    }
}
