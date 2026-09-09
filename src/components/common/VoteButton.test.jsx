/**
 * Skenario Pengujian:
 *
 * - VoteButton component
 *  - harus menampilkan jumlah upvote dan downvote dengan benar
 *  - harus memanggil onUpVote ketika tombol upvote diklik
 *  - harus memanggil onDownVote ketika tombol downvote diklik
 *  - harus menampilkan kelas active-up ketika pengguna telah melakukan upvote
 *  - harus menampilkan kelas active-down ketika pengguna telah melakukan downvote
 */

import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VoteButton from './VoteButton';

describe('VoteButton component', () => {
  it('harus menampilkan jumlah upvote dan downvote dengan benar', () => {
    // arrange
    render(
      <VoteButton
        upVotesBy={['user-1', 'user-2']}
        downVotesBy={['user-3']}
        onUpVote={() => {}}
        onDownVote={() => {}}
      />
    );

    // assert
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('harus memanggil onUpVote ketika tombol upvote diklik', async () => {
    // arrange
    const mockOnUpVote = vi.fn();
    render(
      <VoteButton
        upVotesBy={[]}
        downVotesBy={[]}
        onUpVote={mockOnUpVote}
        onDownVote={() => {}}
      />
    );
    const upVoteButton = screen.getByRole('button', { name: /upvote/i });

    // action
    await userEvent.click(upVoteButton);

    // assert
    expect(mockOnUpVote).toHaveBeenCalledTimes(1);
  });

  it('harus memanggil onDownVote ketika tombol downvote diklik', async () => {
    // arrange
    const mockOnDownVote = vi.fn();
    render(
      <VoteButton
        upVotesBy={[]}
        downVotesBy={[]}
        onUpVote={() => {}}
        onDownVote={mockOnDownVote}
      />
    );
    const downVoteButton = screen.getByRole('button', { name: /downvote/i });

    // action
    await userEvent.click(downVoteButton);

    // assert
    expect(mockOnDownVote).toHaveBeenCalledTimes(1);
  });

  it('harus menampilkan kelas active-up ketika pengguna telah melakukan upvote', () => {
    // arrange
    render(
      <VoteButton
        upVotesBy={['user-1']}
        downVotesBy={[]}
        onUpVote={() => {}}
        onDownVote={() => {}}
        authUserId="user-1"
      />
    );
    const upVoteButton = screen.getByRole('button', { name: /upvote/i });

    // assert
    expect(upVoteButton).toHaveClass('active-up');
  });

  it('harus menampilkan kelas active-down ketika pengguna telah melakukan downvote', () => {
    // arrange
    render(
      <VoteButton
        upVotesBy={[]}
        downVotesBy={['user-1']}
        onUpVote={() => {}}
        onDownVote={() => {}}
        authUserId="user-1"
      />
    );
    const downVoteButton = screen.getByRole('button', { name: /downvote/i });

    // assert
    expect(downVoteButton).toHaveClass('active-down');
  });
});
