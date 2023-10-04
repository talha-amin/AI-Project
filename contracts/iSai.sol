// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract iSai is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;

    string private URI;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Name", "Symbol") {}

    mapping(uint => string) _tokenURIs;

    function _baseURI() internal view override returns (string memory) {
        return URI;
    }

    function tokenURI(
        uint256 _tokenId
    ) public view override returns (string memory) {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return
            bytes(_tokenURIs[_tokenId]).length > 0 ? _tokenURIs[_tokenId] : "";
    }

    function _setTokenURI(uint _tokenId, string memory _tokenURI) internal {
        _tokenURIs[_tokenId] = _tokenURI;
    }

    function safeMint(string memory _tokenURI) public onlyOwner {
        uint256 _tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);
    }

    // Single airdrop function
    function airdropMint(
        address _address,
        string memory _tokenURI
    ) external onlyOwner {
        uint256 _tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(_address, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);
    }

    // Overriding transfer functions to prevent transfers
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        revert("iSai: Transfers are forbidden");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        revert("iSai: Transfers are forbidden");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public virtual override {
        revert("iSai: Transfers are forbidden");
    }

    function approve(address to, uint256 tokenId) public virtual override {
        revert("iSai: Transfers are forbidden");
    }

    function setApprovalForAll(
        address operator,
        bool approved
    ) public virtual override {
        revert("iSai: Transfers are forbidden");
    }
}