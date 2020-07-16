pragma solidity >=0.4.22 <0.7.0;

contract Owner {

    address private owner;
    
    struct exerciseData {
        string name;
        string gender;
        string height;
        string weight;
        string exerciseTime;
        string hrAvg;
        string hrMax;
        string speedAvg;
        string speedMax;
        string distance;
    }
    
    uint exerciseID;
    mapping(address => exerciseData) exercises;
    address[] public usersExercise;
    
    
    // EVM logging
    event OwnerSet(address indexed oldOwner, address indexed newOwner);
    
    // Verifica se o atual acesso é dono do bloco
    modifier isOwner() {
        require(msg.sender == owner, "Não é o dono !");
        _;
    }
    //Seta o construtor, para dizer quem é o primeiro dono do bloco
    constructor() public {
        owner = msg.sender; // 'msg.sender' é o atual usuário
        emit OwnerSet(address(0), owner);
    }
    
    //Muda o dono do bloco após a venda
    function changeOwner(address newOwner) public isOwner {
        emit OwnerSet(owner, newOwner);
        exerciseData memory exercise ;
        exercise = exercises[owner] ;
        exercises[newOwner] = exercises[owner];
        
        exercises[owner] = exerciseData("", "", "", "", "", "", "", "", "", "");
        owner = newOwner;
        
        usersExercise.push(newOwner);        
    }

    //retorna o dono
    function getOwner() external view returns (address) {
        return owner;
    }
    
    function setData(address _address, string memory _name, string memory _gender, string memory _height, string memory _weight, string memory _exerciseTime, string memory _hrAvg, string memory _hrMax, string memory _speedAvg, string memory _speedMax, string memory _distance) public {  
        exerciseData memory exercise ;
        exercise = exercises[_address] ;
        
        exercises[_address] = exerciseData(_name, _gender, _height, _weight, _exerciseTime, _hrAvg, _hrMax, _speedAvg, _speedMax, _distance);
        
        usersExercise.push(_address);
        
    }
    
    function getExercise() view public returns (address[] memory) {
        return usersExercise;
    }
    
    function getExerciseData(address _address) view public returns (string memory, string memory, string memory, string memory, string memory, string memory) {
        return (exercises[_address].exerciseTime, exercises[_address].hrAvg, exercises[_address].hrMax, exercises[_address].speedAvg, exercises[_address].speedMax, exercises[_address].distance );
    
    }
    
    function getUserData(address _address) view public returns (string memory,string memory,string memory,string memory){
        return (exercises[_address].name, exercises[_address].gender, exercises[_address].height, exercises[_address].weight);
    }
}
