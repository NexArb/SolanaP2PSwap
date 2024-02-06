from hexbytes import HexBytes
from web3 import Web3
from web3.contract.contract import ContractFunction
from web3.types import Wei, TxParams, TxReceipt, Nonce

from app.utils.constants.environment_keys import EnvironmentKeys
from app.utils.environment.environment_manager import EnvironmentManager


def get_web3_object(env_manager: EnvironmentManager) -> Web3:
    web3 = Web3(Web3.HTTPProvider(env_manager.get_key(EnvironmentKeys.RPC_ENDPOINT.value)))
    if env_manager.get_key(EnvironmentKeys.OS.value) == "Dev":
        web3 = Web3(Web3.HTTPProvider(env_manager.get_key(EnvironmentKeys.RPC_ENDPOINT_TEST.value)))
    return web3


def get_bridge_contract_requirements(env_manager: EnvironmentManager) -> (str, str, str):
    return (env_manager.get_key(EnvironmentKeys.BRIDGE_CONTRACT_ADDRESS.value),
            env_manager.get_key(EnvironmentKeys.WALLET_ADDRESS.value),
            env_manager.get_key(EnvironmentKeys.PRIVATE_KEY.value))


def get_gas_fee(web3: Web3) -> Wei:
    latest_block = web3.eth.get_block("latest")
    current_base_fee = latest_block['baseFeePerGas']
    return current_base_fee  # Adding 1 Gwei above the base fee


def create_transaction_and_sign(web3: Web3,
                                call_function: ContractFunction,
                                max_fee_per_gas: Wei,
                                private_key:str,
                                nonce: Nonce
) -> TxReceipt:
    transaction: TxParams = call_function.build_transaction(
        {'gas': 600002, 'maxFeePerGas': max_fee_per_gas, 'maxPriorityFeePerGas': 1000000000,
         "chainId": web3.eth.chain_id, "nonce": nonce}
    )
    # Sign transaction
    signed_tx = web3.eth.account.sign_transaction(transaction, private_key=private_key)
    # Send transaction
    send_tx: HexBytes = web3.eth.send_raw_transaction(signed_tx.rawTransaction)
    # Wait for transaction receipt
    return web3.eth.wait_for_transaction_receipt(send_tx)
