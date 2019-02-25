pragma solidity 0.5.4;

contract Oracle {
    event GenerateRandom(uint256 sequence, uint256 timestamp);
    event ShowRandomNumber(uint256 number);
    uint256 public sequence = 0;

    function generateRandom() public {
        GenerateRandom(sequence, now);
        sequence++;
    }

    function __callback(uint256 generatedNumber) public {
        ShowRandomNumber(generatedNumber);
    }
}
