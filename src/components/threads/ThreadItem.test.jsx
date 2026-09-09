/**
 * Skenario Pengujian:
 *
 * - ThreadItem component
 *  - harus merender judul thread, nama author, kategori, dan jumlah komentar dengan benar
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ThreadItem from './ThreadItem';

describe('ThreadItem component', () => {
  it('harus merender judul thread, nama author, kategori, dan jumlah komentar dengan benar', () => {
    // arrange
    const fakeThread = {
      id: 'thread-1',
      title: 'Judul Diskusi Testing',
      body: 'Ini isi cuplikan diskusi',
      category: 'testing',
      createdAt: '2026-09-01T07:00:00.000Z',
      upVotesBy: ['user-1'],
      downVotesBy: [],
      totalComments: 5,
      user: {
        id: 'user-1',
        name: 'Dimas Saputra',
        avatar: 'https://ui-avatars.com/api/?name=Dimas',
      },
    };

    render(
      <BrowserRouter>
        <ThreadItem
          {...fakeThread}
          authUserId="user-1"
          onUpVote={() => {}}
          onDownVote={() => {}}
        />
      </BrowserRouter>
    );

    // assert
    expect(screen.getByText('Judul Diskusi Testing')).toBeInTheDocument();
    expect(screen.getByText('Dimas Saputra')).toBeInTheDocument();
    expect(screen.getByText('#testing')).toBeInTheDocument();
    expect(screen.getByText(/5 Komentar/i)).toBeInTheDocument();
  });
});
