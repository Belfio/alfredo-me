# One month of Solana with Anchor and Rust

## My first experience with Rust and Anchor

I left Ethereum and the "simple" Solidity more than a month ago now. My first impression with Rust was the usual dread that you get when you see something you have no clue about. For example:
<br />
<br />

```
use anchor_lang::prelude::*;

#[program]
pub mod my_program {
    use super::*;

pub fn initialize(ctx:Context<Init>)-> Result<()>{}
}

#[derive(Accounts)]
#[instruction(company_name: String)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub company_registry: Account<'info>,

}
```

<br />
What the hell was that?
Turned out it is not too far from what this could be if written in Typescript, infact Rust is a strongly typed programming language, and together with some C patterns (measure memory and overflows) and new Rust specific patterns (ownership!), I am almost enjoying it.
I need way more prep to write something that makes sense and builds with Rust compared to Typescript, but if it compiles, it is likely to work.
2024-11-03
