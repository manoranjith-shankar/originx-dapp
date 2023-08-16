import { useDisclosure } from '@mantine/hooks';
import { Modal, Table, Group, Button} from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import { useState } from 'react';

const PrizeModal = ({ isOpen }) => {
  const [opened, { open, close }] = useDisclosure(false);

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
        <Modal opened={opened} onClose={close} withCloseButton={false} centered classNames={customStyles}>
          <div className='justify-content-center'>
            <h2>Raffle Prize Pool</h2>
          </div>
          <Table withBorder withColumnBorders>
            <thead>
              <tr>
                <th>Entity</th>
                <th>Raffle Pool Share (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Raffle Creator (R1)</td>
                <td>1.075 FTM</td>
              </tr>
              <tr>
                <td>Raffle Winner</td>
                <td>Non-Fungible Token (NFT)</td>
              </tr>
              <tr>
                <td>Development Team (R2)</td>
                <td>0.075 FTM</td>
              </tr>
              <tr>
                <td>Charity</td>
                <td>0.35 FTM</td>
              </tr>
            </tbody>
          </Table>
        </Modal>

        <Group position="center">
        <Button onClick={open}>Open Modal</Button>
      </Group>
      </MantineProvider>
    </>
  );
};

export default PrizeModal;