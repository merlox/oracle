pragma solidity 0.5.4;

contract Oracle {
    event GenerateRandom(uint256 indexed sequence, uint256 indexed timestamp);
    event ShowRandomNumber(uint256 number);
    uint256 public sequence = 0;

    function generateRandom() public {
        emit GenerateRandom(sequence, now);
        sequence += 1;
    }

    function __callback(uint256 generatedNumber) public {
        emit ShowRandomNumber(generatedNumber);
    }
}
