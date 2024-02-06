use anchor_lang::prelude::*;

pub mod contexts;
use contexts::*;

pub mod state;
declare_id!("FNJFRnVbYq3ww8LnsYweRDs3NdJ7fT13CUaB9KDHEfpR");

#[program]
pub mod escrow {
    use super::*;

    pub fn make(ctx: Context<Make>, seed: u64, deposit: u64, receive: u64) -> Result<()> {
        ctx.accounts.deposit(deposit)?;
        ctx.accounts.save_escrow(seed, receive, &ctx.bumps)
    }

    pub fn refund(ctx: Context<Refund>) -> Result<()> {
        ctx.accounts.refund_and_close_vault()
    }

    pub fn take(ctx: Context<Take>) -> Result<()> {
        ctx.accounts.deposit()?;
        ctx.accounts.withdraw_and_close_vault()
    }
}

#[derive(Accounts)]
pub struct Initialize {}
