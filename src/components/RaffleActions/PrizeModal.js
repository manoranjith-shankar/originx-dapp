import { useDisclosure } from '@mantine/hooks';
import { Modal, Table } from '@mantine/core';
import { MantineProvider } from '@mantine/core';

const PrizeModal = ({ isOpen, onClose }) => {
  const [ opened ] = useDisclosure(isOpen);

  const customStyles = {
    content: 'custom-content',
    item: 'custom-item',
    input: 'custom-modal-input',
    value: 'custom-value',
    values: 'custom-values',
    searchInput: 'custom-searchInput',
    itemsWrapper: 'custom-items-wrapper',
  };

  return (
    <>
      <MantineProvider theme={{ fontFamily: 'Poppins', colorScheme: 'dark' }}>
        <Modal opened={opened} onClose={onClose} withCloseButton={false} centered classNames={customStyles} overlayProps={{
          opacity: 0.55,
          blur: 3,
        }}
        transitionProps={{ transition: 'fade', duration: 600, timingFunction: 'linear' }}
        >
          <div className='justify-content-center' style={{marginTop: "1px"}}>
            <h3>Raffle Prize Pool</h3>
          </div>
          <Table withBorder withColumnBorders fontSize='md'>
            <thead>
              <tr>
                <th>Entity</th>
                <th>Raffle Pool Share (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Raffle Creator (R1)</td>
                <td>1.075 ETH</td>
              </tr>
              <tr>
                <td>Raffle Winner</td>
                <td>Non-Fungible Token (NFT)</td>
              </tr>
              <tr>
                <td>Development Team (R2)</td>
                <td>0.075 ETH</td>
              </tr>
              <tr>
                <td>Charity</td>
                <td>0.35 ETH</td>
              </tr>
            </tbody>
          </Table>
        </Modal>
      </MantineProvider>
    </>
  );
};

export default PrizeModal;