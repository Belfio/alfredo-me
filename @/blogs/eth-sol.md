# Moving from Ethereum to Solana

## I am working on INC, and learning about smart contracts. There is something annoying about developing with Solidity and the ethereum network.

<br><br><br>
To build the INC protocol, I need to develop a set of smart contracts that interact with each other. One smart contract to create a company. One smart contract to build the fungible tokens that represent the company shares; and a couple more. I have looked around and asked ChatGPT, and due to the size of the market, the Ethereum network seemed to be a good choice. One key element in the decision process was Solidity, the language used in the Ethereum protocol to write smart contracts. Solidity heavily resembles JavaScript, a language that I use daily for work.
<br><br><br>
I started the development journey by following a course on [Udemy](https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/) that I recommend. During the course, I learned about the two main issues that the community was facing: the Solidity language has different versions and compiling the contracts often comes with versioning errors; deploying and using the contracts on the main network is expensive. I quickly solved the second issue by targeting a second-level network, Optimism, that guarantees speed and low costs. Having learned the key aspects of Solidity and the Ethereum protocol, I started tinkering with development tools and the ERC protocols. The ERC protocols are a set of smart contract templates that have been tested, and a company (OpenZeppelin) provides easy access on GitHub.
<br><br><br>
Here is where things got me into trouble and where the problems mentioned in the course became true.
<br><br><br>
Please note, it is 100% a skills gap. However, learning how to handle different versions of Solidity so early in the development journey is not a skill I want to learn.
The issues started when I tried to deploy multiple smart contracts, talking to each other, and all based on ERC templates. For some reason that I could not figure out the different versions of Solidity used in the templates and on my project collided.
<br><br><br>

Coupled with the fact that Optimism is still not very cheap and fast, especially compared to Solana.

- On Solana, a transaction cost is $0.00025.
- On Optimism, it's $0.50.
  <br><br>
- Solana transaction execution speed is 1 second.
- Optimism is 1 minute?!

But it is not all perfect. Solana can be this fast because the smart contracts are developed in Rust, a language I do not know.
I guess it's time to learn! Let's see how this feels.
<br><br><br>
While I heard the Rust community is awful, they provide some (not so great) [learning tools](https://www.rust-lang.org/learn).
Solana instead seems to have a very good [free course](https://solana.com/it/docs/intro/quick-start).

Let's start!
